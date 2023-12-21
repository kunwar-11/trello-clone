import { db } from "@/lib/db";

function OrganizationIdPage() {
  async function create(formData) {
    "use server";
    await db.board.create({
      data: {
        title: formData.get("title"),
      },
    });
  }

  return (
    <div>
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="enter board title"
          className="border border-black p-1"
        />
      </form>
    </div>
  );
}

export default OrganizationIdPage;
