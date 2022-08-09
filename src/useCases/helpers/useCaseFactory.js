module.exports = (selectors, execute) => {
  if (!execute || typeof execute !== 'function') {
    throw new Error('execute is not a function')
  }

  return (appDependencies) => {
    const targetDependencies = {}

    selectors.forEach((dependency) => {
      const { repo, actions } = dependency
      const targetRepo = appDependencies[repo]
      if (!targetRepo) {
        throw new Error(`${repo} is not exist in dependencies`)
      }

      actions.forEach((action) => {
        const targetAction = targetRepo[action]
        if (!targetAction || typeof targetAction !== 'function') {
          throw new Error(
            `${action} name in ${repo} repo is not exist in dependencies`
          )
        }
        targetDependencies[action] = targetAction
      })
    })

    return {
      execute: () => execute(targetDependencies),
    }
  }
}
