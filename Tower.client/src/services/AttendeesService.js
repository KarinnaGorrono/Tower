import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"



class AttendeesService {
    async getActiveAttendees(id) {
        const res = await api.get('api/events/' + id + '/attendees')
        logger.log('ATTENDING TO THIS EVENT', res.data)
        let active = AppState.activeAttending
        active = res.data
        AppState.activeAttending = active
        if (AppState.user.isAuthenticated) {
            await this.getMyAttending()
        }
        await this.findActiveAttending(id)
    }
    async getMyAttending() {
        const res = await api.get('account/attendees')
        logger.log('ATTENDING', res.data)
        let attending = AppState.attending
        attending = res.data
        AppState.attending = attending
    }
    async attend(id) {
        const res = await api.post('api/attendees', { eventId: id })
        logger.log('ATTENDING', res.data)
        let newAttend = res.data
        AppState.activeAttending.push(newAttend)
        AppState.activeEvent = newAttend.event
        eventsService.getActive(id)
        this.getActiveAttendees(id)

    }
    async notAttending(eventId, id) {
        const res = await api.delete('api/attendees/' + id)
        logger.log('NOT ATTENDING', res.data)
        AppState.attending = AppState.attending.filter(a => a.id !== id)
        AppState.activeAttending = AppState.activeAttending.filter(a => a.id !== id)
        AppState.activeEvent = eventId
        eventsService.getActive(eventId)
        await this.getActiveAttendees(eventId)
        await this.findActiveAttending(eventId)
    }
    async notAttendingAccount(eventId, id) {
        const res = await api.delete('api/attendees/' + id)
        logger.log('NOT ATTENDING', res.data)
        AppState.attending = AppState.attending.filter(a => a.id !== id)
        AppState.activeEvent = eventId
        await this.getActiveAttendees(eventId)
        await this.findActiveAttending(eventId)
    }
    async findActiveAttending(eventId) {
        let active = AppState.attending.find(a => a.eventId === eventId)
        AppState.myActiveAttend = active
        logger.log('MY ATTENDING THIS EVENT', active)
    }
}
export const attendeesService = new AttendeesService()