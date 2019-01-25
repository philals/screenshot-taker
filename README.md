# Screenshot:on deploy:save to S3

With this function, deployed to Zeit.now, you will be able to trigger screenshots of websites that are saved to an S3 bucket. Once your site is developed you'll be able to string them together into a time lapse gif.

## How it works

The lambda uses Pupperteer to control headless-chrome. It is triggered by making a `POST` request.

Credit to [u/tejikistan](https://www.reddit.com/r/serverless/comments/aav12i/screenshots_as_a_service_a_lambda_that_uses/) for most of the code.

## Deploy

#### Requirements:
- AWS account
- Zeit account
- Zeit cli installed

Create an AWS user in IAM that has the following policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ScreenhotUploader",
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": [
                "arn:aws:s3:::screenshots-abc",
                "arn:aws:s3:::screenshots-abc/*"
            ]
        }
    ]
}
```
Replace `screenshots-abc` with your S3 bucket name. This will allow you to generate a key and secret which will allow the Zeit lambda to upload to S3.

Run the following command. Replace {value} with the appropriate value.

```
git clone https://github.com/philals/screenshot-taker
cd screenshot-taker
now secret add st_key {value}
now secret add st_secret {value}
now secret add st_bucket {value}
now
```

Tip: use `now alias mysite.com` to alias to your domain.

## How to trigger:

One each deploy of your website `POST` to https://yournowurl.now.sh?site=https://example.com/page

## Local dev

Exit `.env_example` to `.env` and replace with your keys.

```
npm run local
```
