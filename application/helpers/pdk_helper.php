<?php

function getEntryId($entry) {
    $item_id_arr = explode("/", $entry->id);
    return $item_id_arr[sizeof($item_id_arr) - 1];
}

function getEntryCategories($entry) {
    $ret = "";
    if ($entry && $entry->{'media$categories'}) {
        $retArr = array();
        for ($i = 0; $i < sizeof($entry->{'media$categories'}); $i++) {
            $retArr[] = $entry->{'media$categories'}[i]->{'media$name'};
        }
        $ret = implode(",", $retArr);
    }
    return $ret;
}

function getEntryFirstGenre($entry) {
    $ret = "";
    if ($entry &&
            isset($entry->{'media$categories'}) &&
            sizeof($entry->{'media$categories'}) > 0) {
        $ret = $entry->{'media$categories'}[0]->{'media$name'};
    }
    return $ret;
}

function getEntryFirstVodCategory($entry) {
    $ret = "";
    if ($entry &&
            isset($entry->{'pl1$vod_category'}) &&
            sizeof($entry->{'pl1$vod_category'}) > 0) {
        $ret = $entry->{'pl1$vod_category'}[0];
    }

    return $ret;
}

function getEntryFirstMediaType($entry) {
    $ret = "";
    if ($entry &&
            isset($entry->{'pl1$media_type'})) {
        $ret = $entry->{'pl1$media_type'};
    }
    return $ret;
}

function getEntryFirstFeaturedCategory($entry) {
    $ret = "";
    if ($entry &&
            isset($entry->{'pl1$featured_category'}) &&
            sizeof($entry->{'pl1$featured_category'}) > 0) {
        $ret = $entry->{'pl1$featured_category'}[0];
    }
    return $ret;
}

function getEntryProperty($entry, $property) {

    $ret = "";

    switch ($property) {
        case 'cover':
            if ($entry->{'media$thumbnails'} &&
                    sizeof($entry->{'media$thumbnails'}) &&
                    $entry->{'media$thumbnails'}[0]->{'plfile$url'}) {
                $ret = $entry->{'media$thumbnails'}[0]->{'plfile$url'};
            }
            break;
        case 'title':
            if (isset($entry->title)) {
                $ret = $entry->title;
            }
            break;
        case 'year':
            if (isset($entry->{'pl1$movie_year'})) {
                $ret = $entry->{'pl1$movie_year'};
            }
            break;
        case 'runtime':
            if (isset($entry->{'pl1$runtime'})) {
                $ret = $entry->{'pl1$runtime'};
            }
            break;

        case 'director':
            if (isset($entry->{'pl1$directors'})) {
                $ret = $entry->{'pl1$directors'};
            }
            break;
        case 'actors':
            if (isset($entry->{'pl1$actors'})) {
                $ret = $entry->{'pl1$actors'};
            }
            break;
        case 'description':
            if (isset($entry->{'description'})) {
                $ret = $entry->description;
            }
            break;
        case 'adPolicyId':
            if (isset($entry->{'plmedia$adPolicyId'})) {
                $ret = $entry->{'plmedia$adPolicyId'};
            }
            break;
        case 'genre':
            if (isset($entry->{'media$categories'})) {
                $arr_genres = array();
                for ($i = 0; $i < sizeof($entry->{'media$categories'}); $i++) {
                    if ($entry->{'media$categories'}[$i]->{'media$scheme'} != 'commerce') {
                        $arr_genres[] = $entry->{'media$categories'}[$i]->{'media$name'};
                    }
                }
                $ret = implode(", ", $arr_genres);
            }
            break;
        case 'commerce':
            if (isset($entry->{'media$categories'})) {
                $arr_genres = array();
                for ($i = 0; $i < sizeof($entry->{'media$categories'}); $i++) {
                    if ($entry->{'media$categories'}[$i]->{'media$scheme'} == 'commerce') {

                        $arr_genres[] = $entry->{'media$categories'}[$i]->{'media$name'};
                    }
                }
                $commerce_class = implode(", ", $arr_genres);
                switch ($commerce_class) {
                    case 'commerce_free_media':
                        $ret = 'commerce_free';
                        break;
                    case 'commerce_members_media':
                        $ret = 'commerce_members';
                        break;
                    case 'commerce_subscription_basic_media':
                        $ret = 'commerce_subscription';
                        break;
                    default:
                        $ret = 'commerce_free';
                        break;
                }
            }
            break;
        case 'writer':
            if (isset($entry->{'pl1$writer'})) {
                $ret = $entry->{'pl1$writer'};
            }
            break;
        case 'tags':
            if (isset($entry->{'media$keywords'})) {
                $ret = $entry->{'media$keywords'};
            }
            break;
        case 'rating':
            if (isset($entry->{'media$ratings'}) && sizeof($entry->{'media$ratings'})) {
                $arr_sub_ratings = array();
                for ($i = 0; $i < sizeof($entry->{'media$ratings'}[0]->subRatings); $i++) {
                    $arr_sub_ratings[] = strtoupper($entry->{'media$ratings'}[0]->subRatings[$i]);
                }
                $ret = strtoupper($entry->{'media$ratings'}[0]->rating) . (sizeof($arr_sub_ratings) ? " (" . implode(", ", $arr_sub_ratings) . ")" : "");
            }
            break;
        case 'media_definition':
            if (isset($entry->{'pl1$mediaDefinition'})) {
                $ret = $entry->{'pl1$mediaDefinition'}[0];
            }
            if (isset($entry->{'pl1$media_definition'})) {
                $ret = $entry->{'pl1$media_definition'}[0];
            }
            break;
        case 'language':
        case 'trailer':
        case 'media_type':
            if (isset($entry->{'pl1$media_type'})) {
                $ret = $entry->{'pl1$media_type'};
            }
            break;
        case 'blocked_stream_public_url':
            if (isset($entry->{'pl1$blocked_stream_public_url'})) {
                $ret = $entry->{'pl1$blocked_stream_public_url'};
            }
            break;
        case 'blocked_stream_hls_url':
            if (isset($entry->{'pl1$blocked_stream_hls_url'})) {
                $ret = $entry->{'pl1$blocked_stream_hls_url'};
            }
            break;
        case 'aired_date':
            if (isset($entry->{'pl1$aired_date'})) {
                $date = $entry->{'pl1$aired_date'};
                $ret = strtotime($date);
            } else {
                $ret = '';
            }
            break;
    }

    return $ret;
}

function getEntryReleaseId($entry, $rendition = "Video") {
    $ret = "";
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[0] == $rendition) {
                $ret = $entry->{'media$content'}[$i]->{'plfile$releases'}[0]->{'plrelease$pid'};
                break;
            }
        }
    }
    return $ret;
}

function getEntryReleaseUrl($entry, $rendition = "Video") {
    $ret = "";
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if (isset($entry->{'media$content'}[$i]->{'plfile$assetTypes'}) &&
                    sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'}); $j++) {
                    if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[$j] == $rendition &&
                            isset($entry->{'media$content'}[$i]->{'plfile$releases'}) &&
                            sizeof($entry->{'media$content'}[$i]->{'plfile$releases'})) {
                        $ret = $entry->{'media$content'}[$i]->{'plfile$releases'}[0]->{'plrelease$url'};
                        break;
                    }
                }
            }
            if ($ret)
                break;
        }
    }
    return $ret;
}

function getEntryStreamingUrl($entry, $rendition = "Video") {
    $ret = "";
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if (isset($entry->{'media$content'}[$i]->{'plfile$assetTypes'}) &&
                    sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'}); $j++) {
                    if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[$j] == $rendition &&
                            isset($entry->{'media$content'}[$i]->{'plfile$streamingUrl'})) {
                        $ret = $entry->{'media$content'}[$i]->{'plfile$streamingUrl'};
                        break;
                    }
                }
            }
            if ($ret)
                break;
        }
    }
    return $ret;
}

function getEntryFileUrl($entry, $rendition = "Video") {
    $ret = "";
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if (isset($entry->{'media$content'}[$i]->{'plfile$assetTypes'}) &&
                    sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'}); $j++) {
                    if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[$j] == $rendition &&
                            isset($entry->{'media$content'}[$i]->{'plfile$url'})) {
                        $ret = $entry->{'media$content'}[$i]->{'plfile$url'};
                        break;
                    }
                }
            }
            if ($ret)
                break;
        }
    }
    return $ret;
}

function getEntryRenditions($entry, $rendition = "Video") {
    $ret = array();
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if (isset($entry->{'media$content'}[$i]->{'plfile$assetTypes'}) && sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'}); $j++) {
                    if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[$j] == $rendition && 
                        isset($entry->{'media$content'}[$i]->{'plfile$streamingUrl'})) {

                        $rend = new stdClass();

                        $rend->file = $entry->{'media$content'}[$i]->{'plfile$streamingUrl'};
                        $rend->label = $entry->{'media$content'}[$i]->{'plfile$width'} . 'x' . $entry->{'media$content'}[$i]->{'plfile$height'} . ' ' . formatBytes($entry->{'media$content'}[$i]->{'plfile$bitrate'}, 0);
                        $rend->bitrate = $entry->{'media$content'}[$i]->{'plfile$bitrate'};

                        $ret[] = $rend;
                    }
                }
            }
        }
    }

    usort($ret, function($a, $b)
    {
        return ($a->bitrate < $b->bitrate);
    });

    return $ret;
}


function formatBytes($bytes, $precision = 2) {
    $units = array('b', 'kb', 'mb', 'gb', 'tb');

    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);

    return round($bytes, $precision) . $units[$pow];
}

function getEntryThumbnail($entry, $type) {
    $ret = "";
    if ($entry && $entry->{'media$thumbnails'}) {
        for ($i = 0; $i < sizeof($entry->{'media$thumbnails'}); $i++) {
            if ($entry->{'media$thumbnails'}[$i]->{'plfile$assetTypes'} &&
                    sizeof($entry->{'media$thumbnails'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$thumbnails'}[$i]->{'plfile$assetTypes'}); $j++) {

                    if ($entry->{'media$thumbnails'}[$i]->{'plfile$assetTypes'}[$j] == $type) {
                        if ($entry->{'media$thumbnails'}[$i]->{'plfile$downloadUrl'}) {
                            $ret = $entry->{'media$thumbnails'}[$i]->{'plfile$downloadUrl'};
                        } else {
                            $ret = $entry->{'media$thumbnails'}[$i]->{'plfile$url'};
                        }
                        break;
                    }
                }
            }
        }
    }

    return $ret;
}

// returns if the object it's a movie, series or episode
function getEntryVodType($entry) {

    if (isset($entry->{'pl1$vod_category'})) {
        for ($i = 0; $i < sizeof($entry->{'pl1$vod_category'}); $i++) {
            if ($entry->{'pl1$vod_category'}[$i] == "tvj_shows") {
                if (isset($entry->seasons)) {
                    return "tvj_shows";
                } else {
                    return "episode";
                }
            }
        }

        // movie is the default return type
        return "movie";
    } else {
        return "episode";
    }
}

function parseDate($entry) {
    $newDate = "";
    if ($entry != "") {
        $newDate = date("F d, Y", (intval($entry)));
    }
    return $newDate;
}

function pdk_get_entry_download_url($entry, $rendition, $width) {
    $ret = "";
    if ($entry && $entry->{'media$content'}) {
        for ($i = 0; $i < sizeof($entry->{'media$content'}); $i++) {
            if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'} &&
                    sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'})) {
                for ($j = 0; $j < sizeof($entry->{'media$content'}[$i]->{'plfile$assetTypes'}); $j++) {
                    if ($entry->{'media$content'}[$i]->{'plfile$assetTypes'}[$j] == $rendition &&
                            $entry->{'media$content'}[$i]->{'plfile$width'} == $width) {
                        $ret = $entry->{'media$content'}[$i]->{'plfile$downloadUrl'};
                        break;
                    }
                }
            }
            if ($ret)
                break;
        }
    }
    return $ret;
}

function pdk_get_entry_mobile_streaming_url($entry) {

    $url = null;

    $url = pdk_get_entry_download_url($entry, "Video", 854);
    if (!$url)
        $url = pdk_get_entry_download_url($entry, "Video", 600);
    if (!$url)
        $url = pdk_get_entry_download_url($entry, "Video", 400);
    if (!$url)
        $url = pdk_get_entry_download_url($entry, "Video", 320);

    return $url;
}

?>