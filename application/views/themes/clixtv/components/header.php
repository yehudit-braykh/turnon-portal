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
                    <div class="hidden-xs icon icon-clix-logo-white-241x54" style="margin-top: 6px;">
                    </div>
                    <div class="visible-xs icon icon-clix-logo-resp-37x33">

                    </div>
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Browse <span class="caret"></span></a>
                        <ul class="dropdown-menu columns">
                            <div class="arrow-up">

                            </div>
                            <?php
                            // for ($i = 0; $i < sizeof($vod_categories); $i++) {
                            //     echo '<li id="top_sub_menu_' . $vod_categories[$i]->id . '"' . ($sub_section1 == $vod_categories[$i]->id ? 'class="active"' : '') . '><a href="#">' . $vod_categories[$i]->title . '</a></li>';
                            // }
                            ?>
                            <ul class="home-ul">
                                <li>Home</li>
                                <li>Offers</li>
                                <li>My Watchlist</li>
                                <li>Categories</li>
                                <li>Ways to Watch</li>
                                <li>Walkthroughs</li>
                            </ul>
                            <ul class="white-ul">
                                <li>Celebrities</li>
                                <li>Katy Perry</li>
                                <li>Tyga</li>
                                <li>Alana Blanchard</li>
                                <li>Nelly</li>
                                <li>Plain White T’s</li>
                                <li>See Full List…</li>
                            </ul>
                            <ul class="white-ul">
                                <li>Categories</li>
                                <?php
                                for ($i = 0; $i < count($categories); $i++) {
                                    echo '<li id="top_sub_menu_' . $categories[$i]->id . '"><a href="#">' . $categories[$i] . '</a></li>';
                                }
                                ?>
                            </ul>
                            <ul class="white-ul">
                                <li>Offers</li>
                                <li>Nike</li>
                                <li>Offers</li>
                                <li>DirecTV</li>
                                <li>Dodge</li>
                                <li>Porsche</li>
                                <li>See Full List…</li>
                            </ul>
                        </ul>
                    </li>
                <li><a href="#">What is ClixTV</a></li>
                <li>
                    <form id="search" action="#" method="post">
                        <div id="label"><label for="search-terms" id="search-label">search</label></div>
                        <div id="input"><input type="text" name="search-terms" id="search-terms" placeholder="Enter search terms..."></div>
                    </form>
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
