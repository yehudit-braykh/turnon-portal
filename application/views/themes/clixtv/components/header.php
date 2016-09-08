<header class="header-clix">
    <nav class="navbar">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <div class="hidden-xs icon icon-clix-logo-white-319x67">
                    </div>
                    <div class="visible-xs icon icon-clix-logo-resp-37x33">

                    </div>
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CELEBS <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <?php
                            for ($i = 0; $i < sizeof($vod_categories); $i++) {
                                echo '<li id="top_sub_menu_' . $vod_categories[$i]->id . '"' . ($sub_section1 == $vod_categories[$i]->id ? 'class="active"' : '') . '><a href="#">' . $vod_categories[$i]->title . '</a></li>';
                            }
                            ?>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CHANNELS <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Ketty Perry</a></li>
                            <li><a href="#">Justin Beiber</a></li>
                            <li><a href="#">Lady Gaga</a></li>
                            <li><a href="#">G-Eazy</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">About</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li class="signin-div">
                        <div class="singin-btn">
                            SIGN IN
                        </div>
                        <div class="">
                            Register Now
                        </div>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>
