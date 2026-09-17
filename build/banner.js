import { MEDIA_VERSION } from "../src/var"

export default function getBanner(pluginFilename) {
  return `/*!
    * Bssyco jDoc ${MEDIA_VERSION} (https://bssyco.github.io/jdoc/)
    * Copyright 2026 Parviz Taghavi
    * Licensed under MIT (https://github.com/bssyco/jdoc/LICENSE)
    */`;
}
