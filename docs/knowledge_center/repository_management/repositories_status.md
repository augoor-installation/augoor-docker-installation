# Repositories Status

Keep track of your repositories' status in "Repositories" or in the "Manage Subscriptions" panel:

| Status         | Description                                              |
| -------------- | -------------------------------------------------------- |
| Cloning        | Updates the current copy.                                |
| Error          | There was an error during processing.                    |
| New            | You have access to this repo but it has not been processed or subscribed yet. |
| Not processed  | Still needs to be processed by the system.               |
| Not subscribed | You haven't subscribed to that repository.               |
| Processing     | Parses the code, generates documentation, and TAGs.      |
| Ready          | Ready to explore.                                        |

And you will also visualize the “Approval status” column with the following options:

| Approval status | Description                                           |
| --------------- | ----------------------------------------------------- |
| Pending approval | A user has requested access to the repo and needs approval. |
| Approved         | You’ve successfully approved the use of this repo.   |

Only Admins: If you need to subscribe to specific branches from a Repository, click on the three dots from the “Actions” column and on “Subscribe repository”. A column with the available branches will display for you to select the ones to subscribe to. Once you approve this repository, only the branches you subscribed to will be available for Regular Users & Gatekeepers.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/5acf7300-f940-49a0-a9ef-1557fb033f18/fa57c5d9-392e-4d16-ba1d-ef2cd7636f0a/Untitled.png)


:::info Note
If you already subscribed to the Main branch and it has been processed, once you want to change the branches to work with, you need to first unsubscribe to the repository, and then subscribe to the specific branches. Wait until the updates’ detection service to automatically reprocess it, or go back to the Admin panel and process that repository manually.
:::


:::info Note
Once you subscribe to a repository and its status appears as “Failed”, contact Augoor support to check on the repository Log.
:::

**Considerations**

- Augoor automatically reprocesses repositories with updates every 20 minutes; syncing must be finished to access the latest version. If there are any issues and a repository is not processed, contact your team Admin for manual reprocessing.
- Remember, you can always return to the "Repositories" section to check their status.

::: info Note
*If you are an Admin or Gatekeeper, go to the [Manage subscriptions](https://www.notion.so/Manage-subscriptions-4608d95c6e6240b993786cb4024ec059?pvs=21) with your special permissions from the get-go.*
:::
