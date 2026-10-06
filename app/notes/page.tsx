import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

interface Props {
  searchParams: Promise<{
    page: string;
    search: string;
  }>;
}

const Notes = async ({ searchParams }: Props) => {
  const page = Number((await searchParams).page) || 1;
  const search = (await searchParams).search || "";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient initialPage={page} initialSearch={search} />
      </HydrationBoundary>
    </>
  );
};
export default Notes;
