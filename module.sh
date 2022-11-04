moduleName=$1
echo "module in build $moduleName"
echo "current dir: $(pwd)"
moduleFolder=$(pwd)/src/modules/$moduleName
echo "module folder: $moduleFolder"
mkdir -p $moduleFolder
cd $moduleFolder

mkdir $moduleFolder/constants
mkdir $moduleFolder/validations
mkdir $moduleFolder/types
mkdir $moduleFolder/__tests__

touch $moduleFolder/$moduleName.controller.ts
touch $moduleFolder/$moduleName.service.ts
touch $moduleFolder/$moduleName.route.ts
touch $moduleFolder/"${moduleName}.docs.json"
touch $moduleFolder/validations/"${moduleName}.validation.ts"
touch $moduleFolder/__tests__/"${moduleName}.controller.ts"
