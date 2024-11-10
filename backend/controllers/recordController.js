import Record from "../models/record.model.js";
import MonthlySummary from'../models/monthlySummary.model.js'

export const addRecord = async(req,res)=>{
  try {
    console.log(req.body);
    const { date, expenditure, earnings } = req.body;
    const parsedDate = new Date(date);
    const month = parsedDate.getMonth() + 1; // JS months are 0-indexed, so add 1
    const year = parsedDate.getFullYear();
    const userId = req.userId;

    const record = new Record({
      date: parsedDate,
      expenditure,
      earnings,
      month,
      year,
      user: userId,
    });

    await record.save();
    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add record', error });
  }
}

export const getMonthlySummary = async (req, res) => {
  try {
    const { year } = req.params;
    const userId = req.userId;
    const summaries = await MonthlySummary.find({ year, user: userId });

    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve monthly summaries' });
  }
};

export const calculateMonthlySummary = async(req,res)=>{
  try {
      const { month, year } = req.body;
      const userId = req.userId;
  
      const records = await Record.find({ month, year, user: userId });
  
      const totalEarnings = records.reduce((sum, record) => sum + record.earnings, 0);
      const totalExpenditure = records.reduce((sum, record) => sum + record.expenditure, 0);
      const revenue = totalEarnings - totalExpenditure;
  
      // Check if a summary already exists for this month and year
      let monthlySummary = await MonthlySummary.findOne({ month, year, user: userId });
      if (monthlySummary) {
        // Update existing summary
        monthlySummary.totalEarnings = totalEarnings;
        monthlySummary.totalExpenditure = totalExpenditure;
        monthlySummary.revenue = revenue;
      } else {
        // Create a new summary
        monthlySummary = new MonthlySummary({
          month,
          year,
          totalEarnings,
          totalExpenditure,
          revenue,
          user: userId,
        });
      }
  
      await monthlySummary.save();
      res.status(200).json({ message: 'Monthly summary calculated and saved successfully', monthlySummary });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate monthly summary' });
    }
}