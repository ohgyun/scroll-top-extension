#!/bin/bash

VERSION=$1
FILENAME="scroll-top-extension-$VERSION.zip"

cd ..

# zip sources to filename
find * -type f -d 0 \
| zip -@ $FILENAME

mv $FILENAME release

exit 0

