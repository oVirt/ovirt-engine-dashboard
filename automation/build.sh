#!/bin/sh -ex

# Clean and then create the artifacts directory:
rm -rf exported-artifacts
mkdir -p exported-artifacts

# Resolve the version and snapshot used for RPM build:
version="$(automation/version.py)"
date="$(date --utc +%Y%m%d)"
commit="$(git log -1 --pretty=format:%h)"
snapshot=".${date}git${commit}"

# Check if the commit is tagged (indicates a release build):
tag="$(git describe --exact-match ${commit} 2>/dev/null || true)"
if [ ! -z ${tag} ]; then
  snapshot=""
fi

# Build the tar file:
tar_name="ovirt-engine-dashboard"
tar_prefix="${tar_name}-${version}/"
tar_file="${tar_name}-${version}${snapshot}.tar.gz"
git archive --prefix="${tar_prefix}" --output="${tar_file}" HEAD

# Build the RPM:
mv "${tar_file}" packaging/
pushd packaging
  export tar_version="${version}"
  export tar_file
  export rpm_snapshot="${snapshot}"
  ./build.sh
popd

# Copy the .tar.gz and .rpm files to the artifacts directory:
for file in $(find . -type f -regex '.*\.\(tar.gz\|rpm\)'); do
  echo "Archiving file \"$file\"."
  mv "$file" exported-artifacts/
done
