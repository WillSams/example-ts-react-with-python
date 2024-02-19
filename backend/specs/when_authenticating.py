from auth import verify_user


class DescribeAuthentication:
    # Since I've hardcoded user/password for this example, these
    # tests can be easily modified once something better is in place.
    def should_verify_correct_credentials(self):
        username = "example-user"
        password = "example-user"

        result = verify_user(username, password)

        assert result is True

    def should_not_verify_incorrect_username(self):
        username = "wrong-username"
        password = "example-user"

        result = verify_user(username, password)

        assert result is False

    def should_not_verify_incorrect_password(self):
        username = "example-user"
        password = "wrong-password"

        result = verify_user(username, password)

        assert result is False
