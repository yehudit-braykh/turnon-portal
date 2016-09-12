<div class="main-page">
    <ul class="slides">
        <div class="overflow">
            <div class="pr h100">
                <div class="rewards-cont">
                    <div class="single-reward" style="background-image: url('')">

                    </div>
                    <div class="single-reward" style="background-image: url('')">

                    </div>
                    <div class="single-reward" style="background-image: url('')">

                    </div>
                </div>
            </div>
        </div>
        <input class="slider-button" type="radio" name="radio-btn" id="img-1" checked />
        <li class="slide-container">
            <div class="slide"  style="background-image: url('http://farm9.staticflickr.com/8072/8346734966_f9cd7d0941_z.jpg')">
            </div>
        </li>

        <input class="slider-button" type="radio" name="radio-btn" id="img-2" />
        <li class="slide-container">
            <div class="slide" style="background-image: url('http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg')">
            </div>
        </li>

        <input class="slider-button" type="radio" name="radio-btn" id="img-3" />
        <li class="slide-container">
            <div class="slide"  style="background-image: url('http://farm9.staticflickr.com/8068/8250438572_d1a5917072_z.jpg')">
            </div>
        </li>

        <input class="slider-button" type="radio" name="radio-btn" id="img-4" />
        <li class="slide-container">
            <div class="slide"  style="background-image: url('http://farm9.staticflickr.com/8061/8237246833_54d8fa37f0_z.jpg')">
            </div>
        </li>

        <input class="slider-button" type="radio" name="radio-btn" id="img-5" />
        <li class="slide-container">
            <div class="slide"  style="background-image: url('http://farm9.staticflickr.com/8055/8098750623_66292a35c0_z.jpg')">
            </div>
        </li>

        <input class="slider-button" type="radio" name="radio-btn" id="img-6" />
        <li class="slide-container">
            <div class="slide"  style="background-image: url('http://farm9.staticflickr.com/8195/8098750703_797e102da2_z.jpg')">
            </div>
        </li>
        <li class="nav-dots">
          <label for="img-1" class="nav-dot" id="img-dot-1"></label>
          <label for="img-2" class="nav-dot" id="img-dot-2"></label>
          <label for="img-3" class="nav-dot" id="img-dot-3"></label>
          <label for="img-4" class="nav-dot" id="img-dot-4"></label>
          <label for="img-5" class="nav-dot" id="img-dot-5"></label>
          <label for="img-6" class="nav-dot" id="img-dot-6"></label>
        </li>
    </ul>
    <?php
        foreach ($vods as $category => $videos) {
     ?>
    <div class="single-category">
        <div class="category-header">
            <?php echo $category; ?>
        </div>
        <div class="carusel">
            <div class="arrow-right hidden-xs" onclick="moveRight('recentInner')">
                <div class="icon icon-arrow-right-33x111"  >
                </div>
            </div>
            <div class="arrow-left hidden-xs" onclick="moveLeft('recentInner')">
                <div class="icon icon-arrow-left-33x111" >
                </div>
            </div>
            <div class="row__inner recentInner">
                <?php foreach ($videos as $video) { ?>
                <div class="tile">
                    <div class="pr">
                        <div class="tile__media">
                            <img class="tile__img" src="<?php echo $video["Poster H"]["url"]; ?>" alt=""  />
                        </div>
                        <div class="tile__details" onclick="openPreview('<?php echo $category?>' , '<?php echo$video["title"] ?>')">
                            <div class="tile__title">
                                <div class="detail-header">
                                    <?php echo $video["title"]; ?>
                                </div>
                                <div class="detail-desc">
                                    <?php echo $video["description"]; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>
        <div class="episode-info <?php echo $category ?>" style="">
            <div class="right-cont">
                <div class="icon icon-play-152x152">
                </div>
                <div class="reward-button">
                    100 Reward Point
                </div>
            </div>
            <div class="show-title">
                Show Title
            </div>
            <div class="episode-title">
                Episode ## | Episode Name
            </div>
            <div class="views-span">
                Number of Views
            </div>
            <div class="share-span">
                <span class="fa fa-share fa-1.5x"></span>
                <span>Share</span>
            </div>
            <div class="episode-desc">
                Descrption Metatags some info about amazing epsiode that no one has ever seen yet but soon to arrive in the box office next to you!
            </div>
            <div class="offers-span">
                Offers in this series  |  Click to Redeem
            </div>
            <div class="offers-cont">
                <div class="single-offer">

                </div>
                <div class="single-offer">

                </div>
                <div class="single-offer">

                </div>
            </div>
        </div>
    </div>
    <?php } ?>
</div>
