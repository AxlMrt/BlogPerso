import prisma from "@/prisma/lib/prisma";

export const getUserFromDatabase = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting user from the database:', error);
    return null;
  }
}
