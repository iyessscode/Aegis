import { auth } from "@/config/auth/server";
import { uploadthing } from "@/config/uploadthing";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const getCurrentUser = async (req: Request) =>
  await auth.api.getSession({
    headers: req.headers,
  });

export const customFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const currentUser = await getCurrentUser(req);

      if (!currentUser?.session.token) {
        console.log("CURRENT USER DOES NOT EXISTS");

        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: currentUser.user.id,
        imageKey: currentUser.user.image_key,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        if (metadata.imageKey) {
          await uploadthing.deleteFiles(metadata.imageKey);
        }
        return {
          uploadedBy: metadata.userId,
          fileUrl: file.ufsUrl,
          message: "File uploaded and user updated",
        };
      } catch (err) {
        console.error("Failed to update user after upload:", err);
        throw new UploadThingError("Failed to update user image");
      }
    }),
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;
