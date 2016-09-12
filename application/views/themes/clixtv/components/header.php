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
                <li class="visible-xs">
                    <form class="search-form" onclick="resizeInput()" tabindex="0" action="#" method="post" >
                        <div class="sub-search" >
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                        <div class="sub-search input-sub">
                            <input type="text" name="search-terms" id="<?php if( window.innerWidth < 786 ) {echo 'search-terms'; } ?>" onblur="removeInput()"  placeholder="Search...">
                        </div>
                    </form>
                </li>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="visible-xs"><a href="#">Login</a></li>
                    <li class="visible-xs" style="border-bottom: 1px solid #ededed; padding-bottom: 6px;"><a href="#">Register</a></li>
                    <li class="dropdown visible-xs">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Celebrities <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>Katy Perry</li>
                            <li>Tyga</li>
                            <li>Alana Blanchard</li>
                            <li>Nelly</li>
                            <li>Plain White T’s</li>
                            <li>See Full List…</li>
                        </ul>
                    </li>
                    <li class="dropdown visible-xs">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Channels <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <?php
                            foreach ($vods as $category => $video) {
                                echo '<li id="top_sub_menu_' . $category . '"><a href="#">' . $category . '</a></li>';
                            }
                            ?>
                        </ul>
                    </li>
                    <li class="dropdown visible-xs">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Offers <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>Nike</li>
                            <li>Offers</li>
                            <li>DirecTV</li>
                            <li>Dodge</li>
                            <li>Porsche</li>
                            <li>See Full List…</li>
                        </ul>
                    </li>
                    <li class="dropdown hidden-xs">
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
                                foreach ($vods as $category => $video) {
                                    echo '<li id="top_sub_menu_' . $category . '"><a href="#">' . $category . '</a></li>';
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
                    <li class="hidden-xs"><a href="#">What is ClixTV</a></li>
                    <li class="hidden-xs">
                        <form class="search-form" onclick="resizeInput()" tabindex="0" action="#" method="post" >
                            <div class="sub-search" >
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                            <div class="sub-search input-sub">
                                <input type="text" name="search-terms" id="search-terms" onblur="removeInput()"  placeholder="Search...">
                            </div>
                        </form>
                    </li>

                </ul>
                <ul class="nav navbar-nav navbar-right hidden-xs">
                    <li class="signin-div">
                        <div class="singin-btn">
                            Login
                        </div>
                        <div class="">
                            Register now
                        </div>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>
