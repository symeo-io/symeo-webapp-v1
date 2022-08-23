import { ResponseWithErrors } from "redux/api/errors.type";

export type PullRequest = {
  id: string;
  author: string;
  commit_number: number;
  size: number;
  days_opened: number;
  creation_date: string;
  merge_date: string;
  status: string;
  vcs_url: string;
  title: string;
  vcs_repository: string;
};

export type GetPullRequestsInput = {
  teamId: string;
  startDate: string;
  endDate: string;
  pageIndex: number;
  pageSize: number;
};

export type GetPullRequestsResponse = ResponseWithErrors & {
  pull_requests_page: {
    pull_requests: [];
    total_page_number: number;
    total_item_number: number;
  };
};
