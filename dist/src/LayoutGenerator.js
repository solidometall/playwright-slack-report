"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFallbackText = exports.generateFailuresByTeams = exports.generateFailures = exports.generateBlocks = void 0;
const generateBlocks = async (summaryResults, maxNumberOfFailures) => {
    const meta = [];
    const header = {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '🎭 *Playwright Results*',
        },
    };
    const summary = {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `✅ *${summaryResults.passed}* | ❌ *${summaryResults.failed}* |${summaryResults.flaky !== undefined
                ? ` 🟡 *${summaryResults.flaky}* | `
                : ' '}⏩ *${summaryResults.skipped}*`,
        },
    };
    const fails = await generateFailures(summaryResults, maxNumberOfFailures);
    if (summaryResults.meta) {
        for (let i = 0; i < summaryResults.meta.length; i += 1) {
            const { key, value } = summaryResults.meta[i];
            meta.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `\n*${key}* :\t${value}`,
                },
            });
        }
    }
    return [header, summary, ...meta, ...fails];
};
exports.generateBlocks = generateBlocks;
const generateFailures = async (summaryResults, maxNumberOfFailures) => {
    const maxNumberOfFailureLength = 650;
    const fails = [];
    const numberOfFailuresToShow = Math.min(summaryResults.failures.length, maxNumberOfFailures);
    for (let i = 0; i < numberOfFailuresToShow; i += 1) {
        const { failureReason, test, suite } = summaryResults.failures[i];
        const formattedFailure = failureReason
            .substring(0, maxNumberOfFailureLength)
            .split('\n')
            .map((l) => `>${l}`)
            .join('\n');
        fails.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${suite} > ${test}*
        \n${formattedFailure}`,
            },
        });
    }
    if (summaryResults.failures.length > maxNumberOfFailures) {
        fails.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*⚠️ There are too many failures to display - ${fails.length} out of ${summaryResults.failures.length} failures shown*`,
            },
        });
    }
    return [
        {
            type: 'divider',
        },
        ...fails,
    ];
};
exports.generateFailures = generateFailures;
const generateFailuresByTeams = async (summaryResults, maxNumberOfFailures, channelList) => {
    const maxNumberOfFailureLength = 650;
    const channelBlocksMap = new Map();
    const numberOfFailuresToShow = Math.min(summaryResults.failures.length, maxNumberOfFailures);
    for (let i = 0; i < numberOfFailuresToShow; i += 1) {
        const { failureReason, test, suite } = summaryResults.failures[i];
        // Extraer el nombre del equipo (canal) del nombre del test
        const match = test.match(/@(\S+)$/);
        const teamName = match ? match[1] : null;
        // Si el nombre del equipo está en la lista de canales
        if (teamName && channelList.includes(teamName)) {
            const formattedFailure = failureReason
                .substring(0, maxNumberOfFailureLength)
                .split('\n')
                .map((l) => `>${l}`)
                .join('\n');
            const block = {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*${suite} > ${test}*\n${formattedFailure}`,
                },
            };
            // Agregar el bloque al Map correspondiente al equipo
            if (!channelBlocksMap.has(teamName)) {
                channelBlocksMap.set(teamName, [{ type: 'divider' }]);
            }
            channelBlocksMap.get(teamName)?.push(block);
        }
    }
    // Agregar advertencia de demasiados fallos si es necesario
    channelList.forEach((channel) => {
        const blocks = channelBlocksMap.get(channel);
        if (blocks && summaryResults.failures.length > maxNumberOfFailures) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*⚠️ There are too many failures to display - ${blocks.length - 1} out of ${summaryResults.failures.length} failures shown*`,
                },
            });
        }
    });
    return channelBlocksMap;
};
exports.generateFailuresByTeams = generateFailuresByTeams;
const generateFallbackText = (summaryResults) => `✅ ${summaryResults.passed} ❌ ${summaryResults.failed} ${summaryResults.flaky !== undefined ? ` 🟡 ${summaryResults.flaky} ` : ' '}⏩ ${summaryResults.skipped}`;
exports.generateFallbackText = generateFallbackText;
//# sourceMappingURL=LayoutGenerator.js.map