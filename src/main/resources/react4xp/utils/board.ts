import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {processHtml} from '/react4xp/utils/html';
import {imageUrl} from '/react4xp/utils/image';

interface GroupData {
  'short-description'?: string;
  member?: string | string[];
}

interface PersonData {
  image?: string;
  email?: string;
  'short-description'?: string;
}

interface BoardMember {
  role?: string;
  person?: string;
}

interface MappedPerson {
  itemId: string;
  name?: string;
  email?: string;
  shortDescription?: string;
  url?: string;
  image?: ReturnType<typeof imageUrl>;
}

interface MappedBoard extends MappedPerson {
  role?: string;
}

interface MappedGroup {
  itemId: string;
  title?: string;
  shortDescription?: string;
  board: MappedBoard[];
}

export const mapPerson = (key: string): MappedPerson => {
  const content = getContent({key});
  if (!content) {
    return {itemId: key};
  }

  const {
    displayName: person,
    _path: personPath,
    data = {}
  } = content;

  const personData = data as PersonData;
  const {
    image: imageKey,
    email,
    'short-description': shortDescription
  } = personData;

  return {
    itemId: key,
    name: person,
    email,
    shortDescription: processHtml(shortDescription),
    url: personPath ? pageUrl({path: personPath}) : undefined,
    image: imageUrl(imageKey, 'full')
  };
};

export const mapBoard = ({
  role: roleId,
  person: personId
}: BoardMember): MappedBoard => {
  const roleContent = getContent({key: roleId || ''});
  const role = roleContent?.displayName;

  return {
    ...mapPerson(personId || ''),
    role
  };
};

export const mapGroup = (itemId: string): MappedGroup => {
  const content = getContent({key: itemId});
  if (!content) {
    return {itemId, board: []};
  }

  const {
    displayName: title,
    data = {}
  } = content;

  const groupData = data as GroupData;
  const {
    'short-description': shortDescription = '',
    member = []
  } = groupData;

  const members = [].concat(member as never);

  return {
    itemId,
    title,
    shortDescription: processHtml(shortDescription),
    board: members.map(mapBoard)
  };
};
