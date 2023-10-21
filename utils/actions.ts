'use server'

import { revalidatePath } from 'next/cache'

// This function is used to update the cache for a given path,
// so we don't have to fetch/request the data on the client.
// revalidatePath does not return any value.
export const update = (paths: string[] = []) => paths.forEach((p) => revalidatePath(p))
