import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService {
    async getComments(id) {
        const res = await api.get('api/events/' + id + '/comments')
        logger.log('GET COMMENTS', res.data)
        let eventComments = AppState.comments
        eventComments = res.data
        AppState.comments = eventComments
    }
    async create(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('COMMENT CREATE', res.data)
        let updatedComment = res.data
        let newComment = AppState.comments
        newComment.unshift(updatedComment)
        AppState.comments = newComment

    }
    async remove(id) {
        const res = await api.delete('/api/comments/' + id)
        logger.log('DELETE COMMENT', res.data)
        let deleted = res.data
        let newComments = AppState.comments.filter(c => c.id !== deleted.id)
        AppState.comments = newComments
    }
    async attend(id) {
        const res = await api.put('api/comments/' + id, true)
        logger.log('ATTEND ON COMMENT', res.data)
    }
    async notAttending(id) {
        const res = await api.put('api/comments/' + id, false)
        logger.log('NOT ATTEND ON COMMENT', res.data)
    }
}
export const commentsService = new CommentsService()