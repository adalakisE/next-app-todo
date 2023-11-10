import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("invalid title");
  }

  await prisma.todo.create({ data: { title, complete: false } });

  redirect("/");
}

function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div>
          <Link className="border rounded p-3 mr-4" href="..">
            Cancel
          </Link>
          <button className="border rounded p-2" type="submit">
            {" "}
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default Page;
