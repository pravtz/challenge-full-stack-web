
export type studentType = {
    name: string
    email:string
    cpf: string
}
export type studentFullType = {
    ra: number
    name: string
    email:string
    cpf: string
}
export type studentUpdateType = {
    ra: number
    name?: string
    email?:string
    cpf?: string
}
export type studentSelectCustom = {
    ra?: number
    name?: string
    email?:string
    cpf?: string
}

export interface IStudentRepository {
    findAll(): Promise<studentFullType[]>
    find(ra: number): Promise<studentFullType | null>
    create(studant: any): Promise<studentType>
    exist(cpf: studentFullType['cpf']): Promise<boolean>
    existFromRa(ra: studentFullType['ra']): Promise<boolean>
    update(data: studentUpdateType): Promise<studentFullType>
    delete(ra: number): Promise<studentFullType>
}