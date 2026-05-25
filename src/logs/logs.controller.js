import Log from "./logs.model.js";
import Application from "../applications/applications.model.js";

const getSortObject = (sort) => {
    if (!sort) {
        return { createdAt: -1 };
    }

    const value = String(sort).trim();

    if (!value) {
        return { createdAt: -1 };
    }

    const descending = value.startsWith("-");
    const field = descending ? value.slice(1) : value;
    const allowedFields = ["createdAt", "updatedAt", "level", "message", "count"];

    if (!allowedFields.includes(field)) {
        return { createdAt: -1 };
    }

    return { [field]: descending ? -1 : 1 };
};

export const getLogs = async (req, res, next) => {
    try {
        const { level, sort, page = 1, limit = 5 } = req.query;

        const application = await Application.findOne({
            name: req.params.name,
            developer: req.user.id
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        const filter = { application: application._id };

        if (level) {
            filter.level = level;
        }

        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.max(1, Number(limit));

        const logs = await Log.find(filter)
            .sort(getSortObject(sort))
            .skip((currentPage - 1) * pageLimit)
            .limit(pageLimit);

        const totalLogs = await Log.countDocuments(filter);

        res.json({
            data: logs,
            pagination: {
                page: currentPage,
                limit: pageLimit,
                total: totalLogs,
                totalPages: Math.ceil(totalLogs / pageLimit)
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createLog = async (req, res, next) => {
    try {
        const { message, level } = req.body;

        const application = await Application.findOne({ name: req.params.name });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.developer.toString() !== req.developer._id.toString()) {
            return res.status(403).json({ message: "You can only post logs to your own application" });
        }

        const existingLog = await Log.findOne({ message, level, application: application._id });

        if (existingLog) {
            existingLog.count += 1;
            existingLog.updatedAt = Date.now();

            await existingLog.save();

            return res.status(201).json(existingLog);
        }

        const log = await Log.create({ message, level, application: application._id });

        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
};