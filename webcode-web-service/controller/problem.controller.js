const Problem = require("../models/Problem.model");
const debug = require("debug")("app:problem-controller");

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const {
      level,
      difficulty,
      tag,
      functioning,
      example,
      sintaxis,
      problem,
      posibleSolutions,
      correctSolution,
      explanation,
    } = req.body;

    const _problem = new Problem();

    _problem["level"] = level;
    _problem["difficulty"] = difficulty;
    _problem["tag"] = tag;
    _problem["functioning"] = functioning;
    _problem["example"] = example;
    _problem["sintaxis"] = sintaxis;
    _problem["problem"] = problem;
    _problem["posibleSolutions"] = posibleSolutions;
    _problem["correctSolution"] = correctSolution;
    _problem["explanation"] = explanation;

    const newProblem = await _problem.save();

    if (!newProblem) {
      return res.status(509).json({ error: "Error saving problem" });
    }

    return res.status(201).json(newProblem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findAll = async (req, res, next) => {
  try {
    const { pagination = true, limit = 10, offset = 0 } = req.query;

    const problems = await Problem.find(undefined, undefined, {
      limit: pagination ? limit : undefined,
      skip: pagination ? offset : undefined,
    });

    if (!problems) {
      return res.status(500).json({ error: "Internal Server error" });
    }

    return res.status(200).json({
      count: pagination ? await Problem.countDocuments() : undefined,
      problems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

controller.findByLevel = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const problem = await Problem.find({ level: identifier });

    return res.status(200).json({ problem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = controller;
