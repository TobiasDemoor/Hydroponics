rm -r build
rm build.tar.gz
cd client
npm run build
cd ..
mkdir build
cp -r client/build build/client
cp -r src build/src
cp -r config build/config
cp package.json build
cp index.js build
cd build
npm install
cd ..
tar -zcvf build.tar.gz build