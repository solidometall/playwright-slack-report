import { FullConfig, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import SlackClient from './SlackClient';
import { SummaryResults } from '.';
declare class SlackReporter implements Reporter {
    private customLayout;
    private customLayoutAsync;
    private maxNumberOfFailuresToShow;
    private showInThread;
    private meta;
    private resultsParser;
    private sendResults;
    private onSuccessSlackChannels;
    private onFailureSlackChannels;
    private slackLogLevel;
    private slackOAuthToken;
    private slackWebHookUrl;
    private slackWebHookChannel;
    private disableUnfurl;
    private proxy;
    private browsers;
    private suite;
    logs: string[];
    onBegin(fullConfig: FullConfig, suite: Suite): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onEnd(): Promise<void>;
    preChecks(): {
        okToProceed: boolean;
        message?: string;
    };
    log(message: string | undefined): void;
    printsToStdio(): boolean;
    postResults(slackClient: SlackClient, channelName: string, summary: SummaryResults): Promise<void>;
}
export default SlackReporter;
