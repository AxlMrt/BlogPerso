import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma/lib/prisma';
import HttpException from '@/config/exceptions/HttpException';

const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await prisma.note.findMany();

    res.json(notes);
  } catch (error) {
    next(new HttpException(500, "Couldn't get notes."));
  }
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Get One');
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Create One');
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Update One');
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Delete One');
};

const _ = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

export default _;
