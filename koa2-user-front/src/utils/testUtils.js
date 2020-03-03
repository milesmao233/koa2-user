export const findTestWrapper = (wrapper, tag) => {
    return wrapper.find(`[data-test="${tag}"]`)
}

export const findTestWrapperParticular = (wrapper, sign ,tag) => {
    return wrapper.find(`[data-test-${sign}="${tag}"]`)
}