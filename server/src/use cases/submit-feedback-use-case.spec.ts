import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const senMailSpy = jest.fn()

describe('Submit feedback', () => {
    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: senMailSpy }
    )

    it('should able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Testando o teste",
            screenshot: "data:image/png;base64,khdhfizukhf"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(senMailSpy).toHaveBeenCalled()
    })

    it('should not able to submit a feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Testando o teste",
            screenshot: "data:image/png;base64,udgfdsukf"
        })).rejects.toThrow()
    })

    it('should not able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,udgfdsukf"
        })).rejects.toThrow()
    })

    it('should not able to submit a feedback with an invalid image', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Testando o teste",
            screenshot: "image.png"
        })).rejects.toThrow()
    })
})