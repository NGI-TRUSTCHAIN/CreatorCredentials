import {
  ChangelogFunctions,
  GetReleaseLine,
  GetDependencyReleaseLine,
} from '@changesets/types';

const REPOSITORY_URL =
  'https://github.com/CreatorCredentials/creator-credentials-ui/commit/';

const getReleaseLine: GetReleaseLine = async (changeset, _type) => {
  const lines = changeset.summary.split('\n').map((l) => l.trimEnd());

  let returnVal = `- ${
    changeset.commit
      ? `[${changeset.commit}](${REPOSITORY_URL}${changeset.commit}): `
      : 'Commit not found'
  }`;

  if (lines.length > 0) {
    returnVal += `\n${lines.map(_formatLine).join('\n')}`;
  }

  return returnVal;
};

const getDependencyReleaseLine: GetDependencyReleaseLine = async (
  changesets,
  dependenciesUpdated,
) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    (changeset) =>
      `- Updated dependencies${
        changeset.commit
          ? ` [${changeset.commit}](${REPOSITORY_URL}${changeset.commit})`
          : ''
      }`,
  );

  const updatedDepenenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
  );

  return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};

const _formatLine = (line: string) => {
  if (!line.startsWith('- ') && !line.startsWith(' - ')) {
    line = '- ' + line;
  }
  return `  ${line}`;
};

const defaultChangelogFunctions: ChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};

export default defaultChangelogFunctions;
