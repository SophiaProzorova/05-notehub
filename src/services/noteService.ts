import type { Note } from "../types/note";
import axios from "axios";

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

interface CreateNoteResponse {
    note: Note
}

interface DeleteNoteResponse {
    notes: Note[],
    totalPages: number
}

const noteHubAPIUrl = `https://notehub-public.goit.study/api/notes`;
const API_KEY = import.meta.env.VITE_API_KEY;
const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`    
};

export const  fetchNotes = async (search: string, page: number): Promise<FetchNotesResponse> => {
    const options = {
        headers: headers,
        params: {
            search: search,
            page: page,
            perPage: 10,
        }
    }

    const response = await axios.get(
        noteHubAPIUrl,
        options
    );    

    return ({
        notes: response.data.notes,
        totalPages: response.data.totalPages
    })
    
};


export const createNote = async ({title, content, tag}: {title: string, content: string, tag: string}): Promise<CreateNoteResponse> => {
    const params = {
        title: title,
        content: content,
        tag: tag
    }

    const response =  await axios.post(
        noteHubAPIUrl,
        params,
        {headers}
    );
    
    return ({
        note: response.data
    })
};

export const deleteNote = async (id: Note["id"]): Promise<DeleteNoteResponse> => {
    const url = `${noteHubAPIUrl}/${id}`;

    const response = await axios.delete(
        url,
        {headers: headers}
    );

    return ({
        notes: response.data.notes,
        totalPages: response.data.totalPages
    })
};