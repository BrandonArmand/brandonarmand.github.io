export interface Badge {
  label: string;
  background: string;
  border: string;
  color: string;
}

export interface Role {
  title: string;
  years: number;
  current?: boolean;
}

export interface Company {
  name: string;
  years: number;
  badges: Badge[];
  roles: Role[];
}

export interface Stint {
  colors: string[];
  years: number;
  companies: Company[];
}

const draftKings: Company = {
  name: 'DraftKings',
  years: 1,
  badges: [{ label: 'now', background: '#eaf8e6', border: '#53d337', color: '#1f5a14' }],
  roles: [{ title: 'Lead Software Engineer', years: 1, current: true }],
};

const railbird: Company = {
  name: 'Railbird Exchange',
  years: 2.5,
  badges: [
    { label: 'YC 22', background: '#fff1e8', border: '#f26522', color: '#a83d0a' },
    { label: 'now DraftKings', background: '#e3f6f0', border: '#38b890', color: '#14614b' },
  ],
  roles: [
    { title: 'Head of Engineering', years: 1 },
    { title: 'Founding Software Engineer', years: 1.5 },
  ],
};

const meta: Company = {
  name: 'Meta',
  years: 2,
  badges: [
    { label: 'Facebook', background: '#e7f0fd', border: '#3d7fd6', color: '#1c4f95' },
    { label: 'Instagram', background: '#fde8f1', border: '#d6478a', color: '#8f1f55' },
  ],
  roles: [
    { title: 'Product Engineer', years: 1 },
    { title: 'Systems Engineer', years: 1 },
  ],
};

const c3: Company = {
  name: 'C3 Business Solutions',
  years: 2,
  badges: [],
  roles: [{ title: 'Software Developer', years: 2 }],
};

const stint = (colors: string[], companies: Company[]): Stint => ({
  colors,
  companies,
  years: companies.reduce((sum, company) => sum + company.years, 0),
});

export const stints: Stint[] = [
  stint(['#53d337', '#8888f0'], [draftKings, railbird]),
  stint(['#3d7fd6'], [meta]),
  stint(['#b9b9c2'], [c3]),
];

export const duration = (years: number): string => `${years} ${years === 1 ? 'year' : 'years'}`;