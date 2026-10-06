import axios from "axios";
import type {Note, NewNote} from "../types/note"


const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}


export const fetchNotes = async( page:number, search?:string):Promise<FetchNotesResponse> => {
    const res = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", {
        params: {
            search: search,
            page: page,
            perPage: 12,
        }, headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    },
    )
    return res.data;
}
export const fetchNoteById = async (id: string) => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
         headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    },
    )
    return res.data;
}

export const createNote = async(newNote:NewNote) => {
    const res = await axios.post<Note>("https://notehub-public.goit.study/api/notes", newNote, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return res.data
}

export const deleteNote = async(id:string):Promise<Note> => {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return res.data
}