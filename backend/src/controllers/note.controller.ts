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
  try {
    const allowedFields = ['title', 'note', 'userMail', 'user'];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter((field) => !allowedFields.includes(field));

    const existing_user = await prisma.user.findUnique({ where: { email: userMail } });

    if (invalidFields.length > 0) next(new HttpException(400, 'Too much arguments'));
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
  const { id } = req.params;
  const { title, note, userId } = req.body;

  try {
    const allowedFields = ['title', 'note', 'user', 'userId'];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter((field) => !allowedFields.includes(field));
    const noteToUpdate = await prisma.note.findUnique({ where: { id } });
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!noteToUpdate) next(new HttpException(404, 'Not not found'));

    if (noteToUpdate!.userId !== userId && currentUser?.role !== 'ADMIN')
      next(new HttpException(403, 'User ID does not match book user ID'));

    if (invalidFields.length > 0) next(new HttpException(400, 'Too much arguments.'));
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, note },
    });

    res.json(updatedNote);
  } catch (error) {
    next(new HttpException(500, "Couldn't update note."));
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const noteToDelete = await prisma.note.findUnique({ where: { id } });
    const loggedInUser = await prisma.user.findUnique({ where: { id: req.body.userId } });

    if (!noteToDelete) next(new HttpException(404, 'Note not found'));
    if (noteToDelete!.userId !== req.body.userId && loggedInUser?.role !== 'ADMIN')
      next(new HttpException(403, 'IDs does not match.'));

    const deletedNote = await prisma.note.delete({ where: { id } });
    res.status(204).json(deletedNote);
  } catch (error) {
    next(new HttpException(500, "Couldn't delete note."));
  }
};

const _ = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

export default _;
