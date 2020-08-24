export class NoOfEmployees {
    id: string;
    name: string;
    isCouncil: boolean;
    companyState: string;
}

export class Council {
    id: string;
    name: string;
}

export class Division {
    id: string;
    name: string;
    subDivisions: Array<SubDivision>;
}

export class SubDivision {
    id: string;
    name: string;
}



