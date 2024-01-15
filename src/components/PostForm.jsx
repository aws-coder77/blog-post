import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";
import service from "../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      collectionId: post?.collectionId || "",
      blogContent: post?.blogContent || "",
      blogStatus: post?.blogStatus || "false",
      imageId: "",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.blogPost.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        service.deleteFile(post.imageId);
      }
      const dpPost = await service.updatePost(post.$id, {
        ...data,
        imageId: file ? file.$id : undefined,
      });
      if (dpPost) {
        navigate(`/post/${dpPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      data.imageId = file?.$id || "";

      const dbPost = await service.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap min-h-screen min-w-full"
    >
      <div className="w-3/5 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: "This field is required",
            maxLength: {
              value: 300,
              message: "meximum length of character the title is 300 ",
            },
          })}
        />

        {errors.title && (
          <p className="flex w-60 bg-red-400 rounded-md py-1 px-2 mx-1  ">
            {errors.title.message}
          </p>
        )}
        <RTE
          label="blogContent"
          name="blogContent"
          control={control}
          defaultValue={getValues("blogContent")}
        />
      </div>
      <div className="w-2/5 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />

        {post && post.imageId && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.imageId)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <label className="text-lg p-1">
          "true" for the public the blog
          <Select
            options={["false", "true"]}
            label="blogStatus"
            className="mb-4"
            {...register("blogStatus", { required: true })}
          />
        </label>
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
