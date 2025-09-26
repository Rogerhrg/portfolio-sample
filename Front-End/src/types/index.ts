export type User = {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
    links: string
}

export type UserHandle = Pick<User, 'handle' | 'name' | 'description' | 'image' | 'links'> 

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle' | 'password'> & {
    password: string
    password_confirmation: string 
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type WikiTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>