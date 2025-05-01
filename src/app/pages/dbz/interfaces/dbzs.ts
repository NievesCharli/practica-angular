export interface Personajes {
    items: Item[];
    meta:  Meta;
    links: Links;
  
}

export interface Item {
    id:          number;
    name:        string;
    ki:          string;
    maxKi:       string;
    race:        string;
    gender:      string;
    description: string;
    image:       string;
    affiliation: string;
    deletedAt:   null;
    data?: Personaje;
}

export enum Affiliation {
    ArmyOfFrieza = "Army of Frieza",
    Freelancer = "Freelancer",
    ZFighter = "Z Fighter",
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

export interface Links {
    first:    string;
    previous: string;
    next:     string;
    last:     string;
}

export interface Meta {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}

export interface Personaje {
    id:              number;
    name:            string;
    ki:              string;
    maxKi:           string;
    race:            string;
    gender:          string;
    description:     string;
    image:           string;
    affiliation:     string;
    deletedAt:       null;
    originPlanet:    OriginPlanet;
    transformations: Transformation[];
}

export interface OriginPlanet {
    id:          number;
    name:        string;
    isDestroyed: boolean;
    description: string;
    image:       string;
    deletedAt:   null;
}

export interface Transformation {
    id:        number;
    name:      string;
    image:     string;
    ki:        string;
    deletedAt: null;
}