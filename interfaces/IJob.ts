export interface IJob{
    jobTitle : string,
    jobSalaryMin : number,
    jobSalaryMax: number,
    jobRequirement: string[],
    workingLocation: string[],
    createAt: Date,
    expireDate: Date, 
    jobCategory: string[],
    jobDescription: string, 
    jobLevel: string
}