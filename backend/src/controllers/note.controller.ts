import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma/lib/prisma';
import HttpException from '@/config/exceptions/HttpException';
import { validEmail } from '@/utils/validation';

const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await prisma.note.findMany();

    res.json(notes);
  } catch (error) {
    next(new HttpException(500, "Couldn't get notes."));
  }
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) next(new HttpException(404, "Note doesn't exist."));
    else res.json(note);
  } catch (error) {
    next(new HttpException(500, "Couldn't get note."));
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, note, userMail } = req.body;
  console.log(req.body);
  try {
    const existing_user = await prisma.user.findUnique({ where: { email: userMail } });

    if (!title) next(new HttpException(400, 'Missing required data.'));
    if (!validEmail(userMail)) next(new HttpException(400, 'Invalid email.'));
    if (!existing_user) next(new HttpException(400, "User doesn't exist."));

    const newNote = await prisma.note.create({
      data: {
        title,
        note,
        user: { connect: { email: userMail } },
      },
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(new HttpException(500, "Couldn't create a new note."));
  }
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
