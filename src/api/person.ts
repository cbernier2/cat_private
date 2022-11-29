import {CatPersons} from './types';
import {Person} from './types/cat/person';
import {CommonConstants} from './types/cat/common';

export const INVALID_PERSON: Person = {
  id: CommonConstants.UNDEFINED_UUID,
  firstName: '',
  initials: '',
  lastName: '',
  isOperator: false,
};

export const findPersonById = (
  persons: CatPersons,
  id: string | undefined,
): Person => {
  return persons.find(person => person.id === id) ?? INVALID_PERSON;
};

export const findPersonByUserName = (
  persons: CatPersons,
  userName: string,
): Person => {
  return persons.find(person => person.userName === userName) ?? INVALID_PERSON;
};
