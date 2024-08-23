import { KnownBlock, Block } from '@slack/types';
import { SummaryResults } from '.';
declare const generateBlocks: (summaryResults: SummaryResults, maxNumberOfFailures: number) => Promise<Array<KnownBlock | Block>>;
declare const generateFailures: (summaryResults: SummaryResults, maxNumberOfFailures: number) => Promise<Array<KnownBlock | Block>>;
declare const generateFailuresByTeams: (summaryResults: SummaryResults, maxNumberOfFailures: number, channelList: string[]) => Promise<Map<string, Array<KnownBlock | Block>>>;
declare const generateFallbackText: (summaryResults: SummaryResults) => string;
export { generateBlocks, generateFailures, generateFailuresByTeams, generateFallbackText, };
