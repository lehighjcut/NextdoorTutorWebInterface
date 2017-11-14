<!--
EXAMPLE PAGE: http://demo.geekslabs.com/materialize/v2.3/layout03/user-login.html
More ideas here: https://www.uplabs.com/web
-->

<div id="Login-body" class="container">
    {{#if alert}}
        <!--{{alert}} TODO: Make some div that prints out the error message to the user in a nice location. The alert will be a string-->
    {{/if}}
    <div class="row">
        <div class="col s8 offset-s2">
            <div class="card white hoverable">
                <div class="card-content">
                    <!--<div class="card-image">-->
                        <!--<img class="center center-align" id="Login-Full-Logo"-->
                             <!--src="assets/images/FinalLogo8.png" alt="Nextdoor Tutor Logo"/>-->
                    <!--</div>-->
                    <h1 id="Login-logoText" class="card-title orange-text center">NextdoorTutor</h1>
                    <div class="g-signin2" id="googleSignIn"></div>
                </div>
                <div class="card-action">
                    <div class="row valign-wrapper">
                        <div class="col s6 center">
                            <a href="https://xkcd.com/501/" class="s4 center-align">Terms &amp; Conditions</a>
                        </div>
                        <div class="col s6 center">
                            <a href="https://www.google.com/search?q=cute+cat+picture&ie=utf-8&oe=utf-8" class="s4 center-align">
                                Cute Cat Picture</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- TODO(kyle): When we have terms of service, use this link to see modal examples using materialize. http://demo.geekslabs.com/materialize/v2.3/layout03/ui-modals.html#
We can do something like: By signing in through Google, you are agreeing to the below TOS -->