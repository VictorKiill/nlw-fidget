import { MailAdapter } from "../adapters/mail.adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error('No type')
        }

        if (!comment) {
            throw new Error('No comment')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid Image')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 1.3rem">`,
                `<p>Tipo do feedback: ${type} </p>`,
                `<p>Comentário do feedback: ${comment} </p>`,
                screenshot ? `<p>Foto do feedback: <img src="${screenshot}"></p>` : null,
                `</div>`,
            ].join('\n')
        })

    }
}