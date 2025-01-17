/// <reference path="./global.d.ts" />
import { PostIdentifier, PersonIdentifier, Identifier } from './type'
import { openDB, DBSchema } from 'idb/with-async-ittr'

function outDb(db: PostDBRecordV40): PostOutDBRecordV40 {
    const { identifier, ...rest } = db
        // Restore prototype
    ;(rest.recipients || []).forEach(y => Object.setPrototypeOf(y, PersonIdentifier.prototype))
    return {
        ...rest,
        identifier: Identifier.fromString(identifier) as PostIdentifier,
    }
}
function toDb(out: PostOutDBRecordV40): PostDBRecordV40 {
    return { ...out, identifier: out.identifier.toText() }
}
interface PostOutDBRecordV40 extends Omit<PostDBRecordV40, 'identifier'> {
    identifier: PostIdentifier
}
interface PostDBRecordV40 {
    identifier: string
    /**
     * ! This MUST BE a native CryptoKey
     */
    postCryptoKey?: CryptoKey
    version: -40
    recipients?: PersonIdentifier[]
}
interface PostDB extends DBSchema {
    /** Use inline keys */
    post: {
        value: PostDBRecordV40
        key: string
    }
}
const db = openDB<PostDB>('maskbook-post-v2', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
        // inline keys
        db.createObjectStore('post', { keyPath: 'identifier' })
    },
})
export async function updatePostDB(
    record: Partial<PostOutDBRecordV40> & Pick<PostOutDBRecordV40, 'identifier'>,
    mode: 'append' | 'override',
): Promise<void> {
    const _rec = (await queryPostDB(record.identifier)) || { identifier: record.identifier, version: -40 }
    const rec = { ...toDb(_rec), ...record }
    if (mode === 'append') rec.recipients = [...(toDb(_rec).recipients || []), ...(record.recipients || [])]

    const t = (await db).transaction('post', 'readwrite')
    await t.objectStore('post').put(toDb(rec))
}
export async function queryPostDB(record: PostIdentifier): Promise<PostOutDBRecordV40 | null> {
    const t = (await db).transaction('post')
    const result = await t.objectStore('post').get(record.toText())
    if (result) return outDb(result)
    return null
}
export async function deletePostCryptoKeyDB(record: PostIdentifier) {
    const t = (await db).transaction('post', 'readwrite')
    await t.objectStore('post').delete(record.toText())
}
export async function backupPostCryptoKeyDB() {
    throw new Error('Not implemented')
}
