import connectDb from "../../utils/db/mongodb";
import WebGame from "../../utils/db/model";
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, WebEntryData } from "../../types/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectDb();

    if (req.method === 'POST') {
        const { userId, data } = req.body as WebEntryData;
        console.log(req.body)
        if (!userId || !data) {
            return res.status(400).json({ error: "Required fields are missing." });
        }

        try {
            const existingPointsEntry = await WebGame.findOne({ userId });

            if (existingPointsEntry) {
                Object.assign(existingPointsEntry.data, data);
                const test = await existingPointsEntry.save();
                console.log('asd', test)
                return res.status(200).json({ message: "WebGame entry updated", entry: existingPointsEntry });
            } else {
                const newPointsEntry = await WebGame.create({ userId, data });
                console.log('asd', newPointsEntry)
                return res.status(201).json({ message: "WebGame entry created", entry: newPointsEntry });
            }
        } catch (error) {
            console.log('error')
            return res.status(500).json({ error: "Error creating/updating points entry." });
        }
    } else if (req.method === 'GET') {
        const userId = req.query.userId as string;

        if (!userId) {
            return res.status(400).json({ error: "UserId is required." });
        }

        try {
            const userData = await WebGame.find({ userId: userId });

            if (!userData.length) {
                return res.status(404).json({ error: "No data found for the given userId." });
            }

            return res.status(200).json({ entries: userData });
        } catch (error) {
            return res.status(500).json({ error: "Error fetching user points data." });
        }

    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
