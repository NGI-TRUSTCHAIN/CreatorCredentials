#!/bin/bash

exclude=".git"
destination="ngi-creator-credentials/"

source="creator-credentials-backend"
cd ${source}
git pull
cd ..
rsync -av --exclude ${exclude} ${source} ${destination}

source="creator-credentials-ui"
cd ${source}
git pull
cd ..
rsync -av --exclude ${exclude} ${source} ${destination}

source="docs"
cd ${source}
git pull
cd ..
rsync -av --exclude ${exclude} ${source} ${destination}

source="specifications"
cd ${source}
git pull
cd ..
rsync -av --exclude ${exclude} ${source} ${destination}
