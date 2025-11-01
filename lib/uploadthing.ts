import { auth } from "@/config/auth/server";
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

      if (!currentUser?.session.token)
        throw new UploadThingError("Unauthorized");

      return { userId: currentUser.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await auth.api.updateUser({
        body: {
          image: file.ufsUrl,
        },
      });
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url: ", file.ufsUrl);
      console.log("file key: ", file.key);

      return {
        uploadedBy: metadata.userId,
        message: "File uploaded successfully",
      };
    }),
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;
