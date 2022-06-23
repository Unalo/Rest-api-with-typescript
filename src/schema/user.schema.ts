import { object, string, TypeOf } from 'zod'

export const createUserSchema = Object({
    body: Object({
        nane: string({
            required_error: "name is required"
        }),
        password: string({
            required_error: "password is required"
        }).min(6, "password too short - should be 5 chars minimum"),
        passwordCornform: string({
            required_error: "password conformation is required"
        }),
        email: string({
            required_error: "email is required"
        }).email('not a valid email')
    }).refine((data: any) => data.password === data.passwordCornform, {
        message: "password do not match",
        path: ["passwordCornform"]
    })
})

export type creaUserInput = Omit < TypeOf<typeof createUserSchema>, "body.passwordCornform">;